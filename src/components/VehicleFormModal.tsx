import { Vehicle } from '@/app';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type VehicleFormModalProps = {
    isFormVisible: boolean,
    onClose: (() => void),
    onSubmit: (vehicle: Vehicle) => void,
}

export default function VehicleFormModal(props: VehicleFormModalProps) {
    const [brand, setBrand] = useState('');  //creates a state variable called "brand" initialized with an empty string as its initial value. //setBrand allows us to update the brand entered by the user.
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');  
    
    function saveVehicle() {         //defines the function that adds a new vehicle to the inventory.
        if (brand.trim() === '') {     //removes surrounding whitespace and checks whether the input is empty.
            return;                      //stops the function if the user has not entered a brand.
        }
        const newVehicle: Vehicle = {  // Creates a new object that follows the Vehicle type structure.
            id: String(Date.now()),      // Generates a unique-looking string ID based on the current timestamp.
            brand: brand.trim(),         // Stores the brand entered by the user, removing surrounding whitespace.
            model: model.trim(),
            year: Number(year),
            price: Number(price),
        };

        props.onSubmit(newVehicle);

        setBrand('');           // Clears the input after successfully adding the vehicle.
        setModel('');
        setYear('');
        setPrice('');
        props.onClose();
    }

    function cancelChanges() {
        setBrand('');           // Clears the input after successfully adding the vehicle.
        setModel('');
        setYear('');
        setPrice('');
        props.onClose();
    }

        return (
            <View>
                <Modal
                    animationType='slide'
                    visible={props.isFormVisible}
                    transparent={false}
                    onRequestClose={() => {
                        props.onClose();
                    }}
                    style={styles.addVehicleForm}
                >
                    <TextInput
                        style={styles.input}
                        placeholder='Enter vehicle brand'
                        value={brand}
                        onChangeText={setBrand}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter vehicle model'
                        value={model}
                        onChangeText={setModel}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter vehicle year'
                        value={year}
                        onChangeText={setYear}
                        keyboardType='number-pad'
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter vehicle price'
                        value={price}
                        onChangeText={setPrice}
                        keyboardType='number-pad'
                    ></TextInput>
                    <Pressable
                        style={styles.addButton}
                        onPress={saveVehicle}
                    >
                        <Text style={styles.addButtonText}>
                            Save changes
                        </Text>
                    </Pressable>
                    <Pressable
                        style={styles.cancelButton}
                        onPress={cancelChanges}
                    >
                        <Text style={styles.cancelButtonText}>
                            Cancel
                        </Text>
                    </Pressable>
                </Modal>
            </View>
        )
    }

const styles = StyleSheet.create({
  input: {
  backgroundColor: '#FFFFFF',
  padding: 15,
  borderRadius: 14,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: '#D1D5DB',
  fontSize: 16,
},
  addButton: {
  backgroundColor: '#172033',
  padding: 15,
  borderRadius: 14,
  alignItems: 'center',
  marginBottom: 20,
},
  addButtonText: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: '700',
},
  addVehicleForm: {
    justifyContent: 'center', 
    alignItems: 'center',
    flex: 1,
    paddingTop: 30,
},
  cancelButtonText: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: '700',
},
  cancelButton: {
  backgroundColor: 'red',
  padding: 15,
  borderRadius: 14,
  alignItems: 'center',
  marginBottom: 20,
},

});