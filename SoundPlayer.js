import React, { Component } from 'react';
import { View, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

class SoundPlayer extends Component {
  constructor(props) {
    super(props);
    this.sound1 = new Audio.Sound();
    this.sound2 = new Audio.Sound();
    this.state = {
      isPlaying1: false,
      isPlaying2: false,
      volume: 1.0,
      sound1Loaded: false,
      sound2Loaded: false,
    };
  }

  async loadSound1() {
    if (!this.state.sound1Loaded) {
      await this.sound1.loadAsync(require('./alalala_long.mp3'));
      this.setState({ sound1Loaded: true });
    }
  }

  async loadSound2() {
    if (!this.state.sound2Loaded) {
      await this.sound2.loadAsync(require('./TanBionica-CiudadMágica.mp3'));
      this.setState({ sound2Loaded: true });
    }
  }

  async playSound1() {
    await this.loadSound1();
    if (this.state.isPlaying1) {
      await this.sound1.stopAsync();
    } else {
      await this.sound1.playAsync();
    }
    this.setState({ isPlaying1: !this.state.isPlaying1 });
  }

  async playSound2() {
    await this.loadSound2();
    if (this.state.isPlaying2) {
      await this.sound2.stopAsync();
    } else {
      await this.sound2.playAsync();
    }
    this.setState({ isPlaying2: !this.state.isPlaying2 });
  }

  async changeVolume(value) {
    this.setState({ volume: value });
    await this.sound1.setVolumeAsync(value);
    await this.sound2.setVolumeAsync(value);
  }

  render() {
    return (
      <View>
        <Button
          title={this.state.isPlaying1 ? 'Stop' : 'Play Audio 1'}
          onPress={() => this.playSound1()}
        />
        <Button
          title={this.state.isPlaying2 ? 'Stop' : 'Play Audio 2'}
          onPress={() => this.playSound2()}
        />
        <Slider
          value={this.state.volume}
          onValueChange={value => this.changeVolume(value)}
          minimumValue={0}
          maximumValue={1}
        />
      </View>
    );
  }
}

export default SoundPlayer;