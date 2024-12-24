import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from '../styles/DeleteConfirmModalStyles';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../constants/colors';
import CustomButton from './CustomButton';

const DeleteConfirmModal = ({isModalVisible, onClosePress, onConfirmPress}) => {
  return (
    <Modal isVisible={isModalVisible} style={styles.modalContainer}>
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Confirm Delete</Text>
        </View>

        <View style={styles.contentView}>
          <Text style={styles.contentText}>
            Are You Sure You Want to Delete this Expense?
          </Text>
        </View>

        <View style={styles.buttonsRow}>
          <CustomButton title="Yes" onPress={onConfirmPress} />

          <CustomButton title="No" onPress={onClosePress} />
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmModal;
