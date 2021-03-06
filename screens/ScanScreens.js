import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            hasCameraPermission : null,
            scanned : false,
            scannedData : "",
            buttonState :   'normal'
        }
    }

    handleBarCodeScanner = (type, data)=>{
        this.setState({
            scanned : true,
            scannedData : data,
            buttonState : 'normal'
        });
    }

    getCameraPermission = async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission : status === 'granted'
        });
    }
    render () {
        const hasCameraPermission = this.state.handleBarCodeScanner;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState === "clicked" && hasCameraPermission) {
            return(
                <BarCodeScanner
                    onBarCodeScanner={scanned ? undefined : this.handleBarCodeScanner}
                    style={StyleSheet.absoluteFillObject}
                />
            );
        }else if(buttonState === "normal") {
            return(
                <View style={styles.container}>
                    <Text style={styles.displayText}>
                        {hasCameraPermission === true ? this.state.scannedData : "Request camera permission"}
                    </Text>
                    <TouchableOpacity
                        onPress={this.getCameraPermission}
                        style={styles.scanButton}>
                        <Text style={styles.buttonText}>Scan QR Code</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}