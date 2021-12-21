import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { logout, changeCountry } from '../../redux/actions';

function Settings(props) {
  const { currentUser } = props;
  const isFocused = useIsFocused();

  const [user, setUser] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [userTags, setUserTags] = useState([]);

  useEffect(() => {
    if (props.previous === 'Settings') {
      setIsCurrentUser(true);
      setUser(props.currentUser);
      setUserTags(props.currentUserTags);
    } else {
      console.log(
        'hello',
        props.route.params.user,
        props.route.params.userTags
      );
      setIsCurrentUser(false);
      setUser(props.route.params.user);
      setUserTags(props.route.params.userTags);
    }

    return () => {
      setIsCurrentUser(false);
      setUser(null);
      setUserTags([]);
    };
  }, [props.currentUser, isFocused]);

  if (user === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  const displayTags = (tags) => {
    return tags.map((tag, key) => {
      return (
        <View key={key} style={styles.userTags}>
          <Text style={styles.tagText}>{tag.name}</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {!isCurrentUser && !user.description ? null : isCurrentUser ? (
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>Description: </Text>
              {!props.currentUser.description
                ? 'Currently you have no description on your profile. Click the button below if you would like to add one.'
                : props.currentUser.description}
              {'\n'}
            </Text>
          ) : (
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>Description: </Text>
              {user.description}
            </Text>
          )}
          {!isCurrentUser && !userTags.length ? null : isCurrentUser &&
            !userTags.length ? (
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>User tags:</Text> Currently
              you have no user tags. Click the button below if you would like to
              add some.
            </Text>
          ) : (
            <View>
              <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                User tags:
              </Text>
              <View style={[styles.cardContent, styles.tagsContent]}>
                {displayTags(userTags)}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  containerInfo: {
    margin: 5,
    padding: 5,
  },
  text: {
    textAlign: 'left',
    fontSize: 18,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    margin: 5,
    fontWeight: '500',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: '#586BA4',
    marginTop: 5,
  },
  cardContent: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  tagsContent: {
    marginTop: 10,
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  userTags: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: '#36C9C6',
    marginTop: 5,
  },
  tagText: {
    fontSize: 13.5,
    fontWeight: '500',
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.currentUser.userInfo,
  otherUser: store.otherUser.userInfo,
  currentUserShows: store.currentUser.userShows,
  otherUserShows: store.otherUser.userShows,
  following: store.currentUser.following,
  otherUsers: store.allOtherUsers.usersInfo,
  currentUserTags: store.currentUser.userTags,
});
const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    changeCountry: (countryCode) => dispatch(changeCountry(countryCode)),
  };
};
export default connect(mapStateToProps, mapDispatch)(Settings);