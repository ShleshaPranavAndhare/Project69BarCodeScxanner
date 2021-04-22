import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCode, BarCodeScanner} from 'expo-barcode-scanner'

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }

     getCameraPermission = async () =>{
         const {status}=await Permissions.askAsync(Permissions.CAMERA);

         this.setState({
             hasCameraPermissions: status === 'granted',
             buttonState: 'clicked',
             scanned: false
         })
     }

     handleBarCodeScanned = async({type, data})=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        });
     }

    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        <Image
                style={styles.imageIcon}
                source={{
                uri:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg',
            }}
        />

        if (buttonState === "clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            )
        }

        else if(buttonState === "normal"){
            return(
                <View style={styles.container}>

                    <Text style={styles.displayText}>{
                        hasCameraPermissions===true ? this.state.scannedData: "Request the Camera Permission"
                    }
                    </Text>

                    <TouchableOpacity
                    onPress={this.getCameraPermission}
                    style={styles.scanButton}>
                    <Text style={styles.buttontext}>Scan QR Code</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    displayText:{
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    scanButton:{
        backgroundColor: 'red',
        padding: 10,
        margin: 10
    },
    buttontext:{
        fontSize: 15,
        textDecorationLine: 'line-through',
        textShadowColor: 'cyan',
        textDecorationColor: 'yellow'
    }
});