import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView, SafeAreaView } from 'react-native';

// Christoffel's Restaurant Menu Management App - ST10107043 - Lesego Ramoroka
export default function App() {
  // Initial menu items - so chef sees data immediately
  const [menuItems, setMenuItems] = useState([
    { id: '1', name: 'Bruschetta', description: 'Tomato, basil, garlic on toasted bread', course: 'Starter', price: '65' },
    { id: '2', name: 'Grilled Sea Bass', description: 'Lemon herb butter, roasted vegetables', course: 'Main Course', price: '185' },
    { id: '3', name: 'Chocolate Lava Cake', description: 'Warm chocolate with vanilla ice cream', course: 'Desert', price: '75' },
  ]);

  const [currentScreen, setCurrentScreen] = useState('list'); // list, add, edit
  const [editingItem, setEditingItem] = useState(null);
  
  // Form fields - as required by brief
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(''); // Starter, Main Course, Desert
  const [price, setPrice] = useState('');

  const courses = ['Starter', 'Main Course', 'Desert'];

  const resetForm = () => {
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setEditingItem(null);
  };

  // VALIDATION AND FEEDBACK - Required by brief
  const validateAndSave = () => {
    if (!dishName.trim()) {
      Alert.alert('Validation Error', 'Dish Name is required!');
      return;
    }
    if (dishName.trim().length < 2) {
      Alert.alert('Validation Error', 'Dish Name must be at least 2 characters!');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Description is required!');
      return;
    }
    if (!course) {
      Alert.alert('Validation Error', 'Please select a Course (Starter, Main Course or Desert)!');
      return;
    }
    if (!price.trim()) {
      Alert.alert('Validation Error', 'Price is required!');
      return;
    }
    if (isNaN(price) || Number(price) <= 0) {
      Alert.alert('Validation Error', 'Price must be a valid number greater than 0!');
      return;
    }

    // Save logic
    if (editingItem) {
      // Update existing
      setMenuItems(menuItems.map(item => 
        item.id === editingItem.id ? { ...item, name: dishName, description, course, price } : item
      ));
      Alert.alert('Success', `Menu item "${dishName}" updated successfully!`);
    } else {
      // Add new
      const newItem = {
        id: Date.now().toString(),
        name: dishName,
        description,
        course,
        price
      };
      setMenuItems([...menuItems, newItem]);
      Alert.alert('Success', `Menu item "${dishName}" added successfully!`);
    }
    
    resetForm();
    setCurrentScreen('list');
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setDishName(item.name);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price);
    setCurrentScreen('add');
  };

  const handleDelete = (id, name) => {
    Alert.alert(
      'Delete Menu Item',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
            setMenuItems(menuItems.filter(item => item.id !== id));
            Alert.alert('Deleted', 'Menu item removed from menu');
        }}
      ]
    );
  };

  const getCourseColor = (c) => {
    if (c === 'Starter') return '#FF8C42';
    if (c === 'Main Course') return '#2C2C2C';
    return '#FF6B35';
  };

  // SCREEN 1: VIEW ALL MENU ITEMS
  if (currentScreen === 'list') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🍴 Christoffel's Restaurant</Text>
          <Text style={styles.headerSub}>{menuItems.length} menu items • Chef Management</Text>
        </View>

        <FlatList
          data={menuItems}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 15 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.dishName}>{item.name}</Text>
                <Text style={styles.price}>R{item.price}</Text>
              </View>
              <Text style={styles.desc}>{item.description}</Text>
              <View style={styles.cardBottom}>
                <View style={[styles.badge, { backgroundColor: getCourseColor(item.course) }]}>
                  <Text style={styles.badgeText}>{item.course}</Text>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editBtn}>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id, item.name)} style={styles.deleteBtn}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No menu items yet. Tap + to add!</Text>}
        />

        <TouchableOpacity style={styles.fab} onPress={() => { resetForm(); setCurrentScreen('add'); }}>
          <Text style={styles.fabText}>+ Add Dish</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // SCREEN 2: ADD / EDIT MENU ITEM
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { resetForm(); setCurrentScreen('list'); }}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</Text>
      </View>

      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.label}>Dish Name *</Text>
        <TextInput style={styles.input} placeholder="e.g. Truffle Pasta" value={dishName} onChangeText={setDishName} />

        <Text style={styles.label}>Description *</Text>
        <TextInput style={[styles.input, { height: 80 }]} placeholder="Describe the dish, ingredients..." value={description} onChangeText={setDescription} multiline />

        <Text style={styles.label}>Course * (Starter, Main Course or Desert)</Text>
        <View style={styles.courseContainer}>
          {courses.map((c) => (
            <TouchableOpacity key={c} style={[styles.courseBtn, course === c && styles.courseBtnActive]} onPress={() => setCourse(c)}>
              <Text style={[styles.courseText, course === c && styles.courseTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Price (R) *</Text>
        <TextInput style={styles.input} placeholder="e.g. 120.00" value={price} onChangeText={setPrice} keyboardType="numeric" />

        <TouchableOpacity style={styles.saveBtn} onPress={validateAndSave}>
          <Text style={styles.saveText}>{editingItem ? 'Update Menu Item' : 'Save Menu Item'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={() => { resetForm(); setCurrentScreen('list'); }}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  header: { backgroundColor: '#2C2C2C', padding: 20, paddingTop: 40 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  headerSub: { color: '#FF6B35', marginTop: 5 },
  back: { color: '#FF6B35', marginBottom: 10, fontSize: 16 },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 12, elevation: 2, borderLeftWidth: 4, borderLeftColor: '#FF6B35' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between' },
  dishName: { fontSize: 18, fontWeight: 'bold', color: '#2C2C2C' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#FF6B35' },
  desc: { color: '#666', marginVertical: 8 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  actions: { flexDirection: 'row', gap: 10 },
  editBtn: { backgroundColor: '#E8F5E9', padding: 8, borderRadius: 6 },
  editText: { color: '#2E7D32', fontWeight: 'bold' },
  deleteBtn: { backgroundColor: '#FFEBEE', padding: 8, borderRadius: 6 },
  deleteText: { color: '#C62828', fontWeight: 'bold' },
  fab: { backgroundColor: '#FF6B35', padding: 16, borderRadius: 30, position: 'absolute', bottom: 20, right: 20, elevation: 5 },
  fabText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  label: { fontWeight: 'bold', marginTop: 15, marginBottom: 5, color: '#2C2C2C' },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12 },
  courseContainer: { flexDirection: 'row', gap: 8, marginVertical: 10 },
  courseBtn: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#DDD', alignItems: 'center', backgroundColor: '#FFF' },
  courseBtnActive: { backgroundColor: '#2C2C2C', borderColor: '#2C2C2C' },
  courseText: { color: '#2C2C2C', fontWeight: 'bold' },
  courseTextActive: { color: '#FFF' },
  saveBtn: { backgroundColor: '#FF6B35', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 25 },
  saveText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  cancelBtn: { padding: 12, alignItems: 'center', marginTop: 10 },
  cancelText: { color: '#666' },
  empty: { textAlign: 'center', marginTop: 50, color: '#999' }
});
