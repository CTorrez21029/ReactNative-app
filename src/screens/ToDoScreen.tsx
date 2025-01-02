import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = 'tasksList'; // Clave única para almacenar la lista completa

const ToDoScreen = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<{id: string; text: string}[]>([]);

  // Cargar tareas almacenadas al iniciar la aplicación
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks)); // Convierte el string a JSON
        }
      } catch (error) {
        console.log('Error loading tasks:', error);
      }
    };

    loadTasks();
  }, []);

  // Guardar la lista completa en AsyncStorage
  const saveTasks = async (newTasks: {id: string; text: string}[]) => {
    try {
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
      console.log('Tasks saved successfully');
    } catch (error) {
      console.log('Error saving tasks:', error);
    }
  };

  const addTask = () => {
    if (task.trim()) {
      const newTask = {id: Date.now().toString(), text: task};
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTask('');
      saveTasks(updatedTasks); // Guarda la lista actualizada
    }
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks); // Guarda la lista actualizada
    console.log('Task deleted:', id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a task"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
  },
});

export default ToDoScreen;
