import React, {
  Component,
} from 'react';
// import {
//   StyleSheet,
// } from 'aphrodite/no-important';
import Container from 'components/Container';
import connect from './connect';

type Props = {
  match: Object,
  getProfile: Function,
};

export class ProfileContainer extends Component {

  props: Props;

  constructor(props: Props) {
    super(props);
    this.requestProfile(props.match.url);
  }

  requestProfile(url: string): void {
    if (!url) {return;}
    const username = url.match(/\/(.+)/)[1];
    this.props.getProfile(username);
  }

  renderProfile() {
    if (this.props.userIsPending) {
      return <p>Loading...</p>;
    }
    return (
      <p>{this.props.userProfile.login}</p>
    );
  }

  render() {
    return (
      <Container>
        {this.renderProfile()}
      </Container>
    );
  }

}

// const styles = StyleSheet.create({

// });

export default connect(ProfileContainer);
