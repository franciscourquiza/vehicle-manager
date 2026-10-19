import { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';

type Vehicle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
};

const initialVehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2024,
    price: 25000,
  },
  {
    id: '2',
    brand: 'Ford',
    model: 'Ranger',
    year: 2023,
    price: 32000,
  },
  {
    id: '3',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2022,
    price: 21000,
  },
  {
    id:"4",
    brand: "Chevrolet",
    model: "Onix",
    year: 2025,
    price: 22500,
  },
];


export default function HomeScreen() {   //defines the main screen component of the application
  const [ vehicles, setVehicles] = useState<Vehicle[]>(  //creates a state variable called "vehicles" initialized with initialVehicles array.//Vehicles[] means that the state conatains an array of Vehicle objects.//setVehicles is the function used to update the vehicles state.
    initialVehicles
  );
  const [ brand, setBrand] = useState('');  //creates a state variable called "brand" initialized with an empty string as its initial value. //setBrand allows us to update the brand entered by the user.
  
  function addVehicle() {          //defines the function that adds a new vehicle to the inventory.
    if (brand.trim() === '') {     //removes surrounding whitespace and checks whether the input is empty.
      return;                      //stops the function if the user has not entered a brand.
    }
    const newVehicle: Vehicle = {  // Creates a new object that follows the Vehicle type structure.
      id: String(Date.now()),      // Generates a unique-looking string ID based on the current timestamp.
      brand: brand.trim(),         // Stores the brand entered by the user, removing surrounding whitespace.
      model: "Unkown",             
      year: 2026,
      price: 0,
    };

    setVehicles((currentVehicles) => [ //Updates the current vehicles state by creating a new array
      ...currentVehicles,  //copes all vehicles that are already in the inventory  ->  spread operator
      newVehicle,           //adds the new vehicle to the end of the array
    ]);

    setBrand('');           // Clears the input after successfully adding the vehicle.
  }
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>INVENTORY MANAGEMENT</Text>
      <Text style={styles.title}>Vehicle Manager</Text>
      <Text style={styles.subtitle}>
        Manage your dealership inventory.
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>TOTAL VEHICLES</Text>
        <Text style={styles.summaryValue}>{vehicles.length}</Text>
        <Text style={styles.summaryDescription}>
          Vehicles in your inventory
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Recent Vehicles</Text>

      <FlatList
        data={vehicles}
        keyExtractor={(vehicle) => vehicle.id}
        renderItem={({ item }) => (
          <View style={styles.vehicleCard}>
            <View style={styles.vehicleIcon}>
              <Text style={styles.vehicleIconText}>
                {item.brand.charAt(0)}
              </Text>
            </View>

            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>
                {item.brand} {item.model}
              </Text>
              <Text style={styles.vehicleYear}>{item.year}</Text>
            </View>

            <Text style={styles.vehiclePrice}>
              ${item.price.toLocaleString('en-US')}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter vehicle brand'
        value={brand}
        onChangeText={setBrand}
      ></TextInput>
      <Pressable
        style={styles.addButton}
        onPress={addVehicle}
      >
        <Text style={styles.addButtonText}>
          Add vehicle
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F9',
    paddingHorizontal: 22,
    paddingTop: 64,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#64748B',
    marginBottom: 10,
  },
  title: {
    fontSize: 29,
    fontWeight: '800',
    color: '#172033',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 7,
    marginBottom: 26,
  },
  summaryCard: {
    backgroundColor: '#1D4ED8',
    padding: 22,
    borderRadius: 20,
    marginBottom: 28,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#DBEAFE',
  },
  summaryValue: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 8,
  },
  summaryDescription: {
    fontSize: 13,
    color: '#DBEAFE',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 14,
  },
  listContent: {
    paddingBottom: 24,
    gap: 12,
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 16,
    gap: 12,
  },
  vehicleIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleIconText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D4ED8',
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#172033',
  },
  vehicleYear: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 5,
  },
  vehiclePrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#15803D',
  },
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
});
