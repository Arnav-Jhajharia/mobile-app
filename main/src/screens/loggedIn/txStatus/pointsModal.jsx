import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Modal, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-elements';
import {Icon} from 'react-native-elements';

// import Video from 'react-native-video';
// import {signAndSendTransactionConnect} from '../../../particle-connect';
// import * as particleAuth from 'react-native-particle-auth';
// import * as particleConnect from 'react-native-particle-connect';
// import createProvider from '../../../particle-auth';
// import createConnectProvider from '../../../particle-connect';
// const Web3 = require('web3');

const PointsModal = ({ userId, onClose, amount }) => {
    const [points, setPoints] = useState(0);
  
    useEffect(() => {
      const getPoints = async () => {
        const newPoints = await addPoints(userId, amount);
        setPoints(newPoints);
      };
  
      getPoints();
    }, [userId]);
  
    return (
      <Modal visible={true} animationType="fade">
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Your Points</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" type="materialicons" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Text style={styles.pointsText}>You have {points} points!</Text>
            <Image source={require('./coins.png')} style={styles.image} />
          </View>
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    modalContent: {
      backgroundColor: 'black',
      borderRadius: 10,
      margin: 50,
      padding: 20,
      alignItems: 'center',
      elevation: 5
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    body: {
      alignItems: 'center'
    },
    pointsText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center'
    },
    image: {
      width: 80,
      height: 80,
      resizeMode: 'contain'
    }
  });
  

  const addPoints = async (userId, transactionAmount) => {
    try {
      const response = await fetch('https://notifs.api.xade.finance/points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, transactionAmount })
      });
  
      const data = await response.json();
      if(data.points > 0)
      return data.points;
      
    } catch (err) {
      console.error(err);
    }
  };
  
export default PointsModal;