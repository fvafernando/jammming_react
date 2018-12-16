import React, {Component} from 'react';
import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      track: this.props.track
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return (<a href="#removeTrack" className="Track-action" onClick={this.removeTrack}>-</a>);
    } else {
      return (<a href="#addTrack" className="Track-action" onClick={this.addTrack}>+</a>);
    }
  }

  addTrack(track) {
    this.props.onAdd(this.props.track);
  }

  removeTrack(track) {
    this.props.onRemove(this.props.track);
  }

  render() {
    console.log("Rendering Track: " + this.props.track.id );
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {
          this.renderAction()
        }
      </div>
    );
  }
}

export default Track;
