import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Dimensions,
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import Carousel from 'react-native-snap-carousel';

const width = Dimensions.get('window').width;

const ViewPage = ({route}) => {
  console.log('last: ' + route.params.length);
  let flatRef = useRef(null);

  return (
    <FlatList
      data={route.params}
      horizontal
      scrollEnabled={false}
      ref={(c) => (flatRef = c)}
      keyExtractor={(item) => item.issueTripID.toString()}
      renderItem={({item, index}) => {
        console.log(index);
        return (
          <>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: 'yellow',
                width: width,
              }}>
              <View style={{flex: 1, justifyContent: 'center', width: '100%'}}>
                <Text>{item.issueAssignedTripID}</Text>
                <Text>{item.issueReasonTripName}</Text>
                <Text>{item.issueTripID}</Text>
              </View>

              <View
                style={{
                  width: width,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                {index == route.params.length - 1 ? null : (
                  <>
                    <Button
                      title="next"
                      onPress={() =>
                        flatRef.scrollToIndex({
                          animated: true,
                          index: index + 1,
                        })
                      }
                    />
                  </>
                )}
                {index == 0 ? null : (
                  <>
                    <Button
                      title="prev"
                      onPress={() =>
                        flatRef.scrollToIndex({
                          animated: true,
                          index: index - 1,
                        })
                      }
                    />
                  </>
                )}
              </View>
            </View>
          </>
        );
      }}
    />
  );
};

export default ViewPage;

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});
