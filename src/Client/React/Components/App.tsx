import React from 'react';
import './App.scss';
import { getLocalData, storeData } from 'Client/client';
import { IpcRenderer } from 'electron';
import LoginMenuComponent from './loginMenu/loginmenu.component';
import MainMenuComponent from './mainmenu/mainmenu.component';
import SettingsMenuComponent from './settingsmenu/settingsmenu.component';
import LobbyComponent from './lobby/lobby.component';

var ipcRenderer: null | IpcRenderer = null;

if (typeof window['require'] !== "undefined") {
  const electron = window['require']("electron");
  ipcRenderer = electron.ipcRenderer;
  console.log("ipc renderer", ipcRenderer);
}

export interface AppProps {
  locs:{[key:string]:Locs}
}

export type AppState = {
  loginData: { loggedIn: boolean, sessionId: string },
  scene: string,
  lastScene: string,
  lang: string,
  username: string,
  fullscreen: boolean,
  resolution: string
}

export default class App extends React.Component {

  readonly state: AppState;

  constructor(readonly props: AppProps) {
    super(props);
    this.state = {
      loginData: { loggedIn: false, sessionId: "" },
      scene: "lobby",
      lastScene: "main",
      lang: "en",
      username: "anonymous",
      fullscreen: false,
      resolution: "1080"
    };
  }

  componentDidMount() {
    // initialising local private data
    getLocalData("loginData")
      .then(data => {
        if (data != null) this.setState({ loginData: JSON.parse(data) });
        this.forceUpdate();
    });
    
    getLocalData("username")
      .then(data => {
        if (data != null) this.setState({ username: data });
        this.forceUpdate();
      });
    
    getLocalData("lang")
      .then(data => {
        if (data != null) this.setState({ lang: data });
        this.forceUpdate();
    });
    
    getLocalData("fullscreen")
      .then(data => {
        if (data != null) {
          this.setState({ fullscreen: JSON.parse(data) });
          this.updateFullscreen(JSON.parse(data));
        }   
    });
    
    getLocalData("resolution")
      .then(data => {
        if (data != null) {
          this.setState({ resolution: data });
          if(ipcRenderer != null) ipcRenderer.send('resize'+data);
        }   
    });
  }

  updateFullscreen(value: boolean) {
    if (value && ipcRenderer != null) ipcRenderer.send('fullscreenOn');
    if (!value && ipcRenderer != null) ipcRenderer.send('fullscreenOff');
  }

  componentDidUpdate() {
    if (!this.state.loginData.loggedIn && ipcRenderer != null) {
      ipcRenderer.send('resizeSmall');
      ipcRenderer.send('center');
    } else if (this.state.loginData.loggedIn && ipcRenderer != null){
      ipcRenderer.send('resize'+this.state.resolution);
    }
  }

  changeScene(scene: string) {
    console.log(scene);
    if (scene === "back") {
      this.setState({ scene: this.state.lastScene, lastScene: this.state.scene });
    } else {
      this.setState({ scene: scene, lastScene: this.state.scene });
    }
  }

  changeSettings(name: string, value: any) {
    if (name === "language") {
      this.setState({ lang: value });
      storeData("lang", value);
    } else if (name === "username") {
      this.setState({ username: value });
      storeData("username", value);
    } else if (name === "fullscreen") {
      this.setState({ fullscreen: value });
      this.updateFullscreen(value);
      storeData("fullscreen", value);
    } else if (name === "resolution") {
      this.setState({ resolution: value });
      if (ipcRenderer != null) ipcRenderer.send('resize' + value);
      storeData("resolution", value);
    }
  }

  render() {
    return (
      <div className="AppDiv">
        {(this.state.scene === "main" &&
          <MainMenuComponent
          loc={this.props.locs[this.state.lang]}
          onSceneRequest={(scene:string)=>this.changeScene(scene)}
        ></MainMenuComponent>
        )}
        {(this.state.scene === "login" &&
          <LoginMenuComponent
          loc={this.props.locs[this.state.lang]}
        ></LoginMenuComponent>  
        )}
        {(this.state.scene === "settings" &&
          <SettingsMenuComponent
          locs={this.props.locs}
          loc={this.props.locs[this.state.lang]}
          resolutions={{"1080":"1920x1080 16:9", "768":"1366x768 16:9", "720":"1280x720 16:9"}}
          onSceneRequest={(scene: string) => this.changeScene(scene)}
          onSettingChange={(name: string, value: any) => this.changeSettings(name, value)}
          currentSettings={{
            lang: this.state.lang,
            username: this.state.username,
            fullscreen: this.state.fullscreen,
            resolution: this.state.resolution
          }}
        ></SettingsMenuComponent>
        )}
        {(this.state.scene === "lobby" &&
          <LobbyComponent
          locs={this.props.locs}
          loc={this.props.locs[this.state.lang]}
          resolutions={{"1080":"1920x1080 16:9", "768":"1366x768 16:9", "720":"1280x720 16:9"}}
          onSceneRequest={(scene: string) => this.changeScene(scene)}
          onSettingChange={(name: string, value: any) => this.changeSettings(name, value)}
          username={this.state.username}
          slots={2}
        ></LobbyComponent>
        )}
      </div>
    )
  }
}



/*{(loginData.loggedIn &&
  <GameComponent loc={this.props.loc}></GameComponent>
)}*/
