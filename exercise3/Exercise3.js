import { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { Appbar, Button, TextInput } from 'react-native-paper'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import 'react-native-gesture-handler'
import Todo from './todo'
import { db } from './firebase'

const Exercise3 = () => {
  const [todo, setTodo] = useState('')
  const [loading, setLoading] = useState(true)
  const [todos, setTodos] = useState([])

  async function addTodo() {
    await addDoc(collection(db, 'todos'), {
      title: todo,
      complete: false,
    })
    setTodo('')
  }

  useEffect(() => {
    return onSnapshot(collection(db, 'todos'), (querySnapshot) => {
      const list = []
      querySnapshot.forEach(doc => {
        const { title, complete } = doc.data()
        list.push({ id: doc.id, title, complete })
      })
      setTodos(list)
      if (loading) { setLoading(false) }
    })
  })

  if (loading) {
    return null
  }

  const Divider = () => {
    return <View style={{ height: 1, backgroundColor: 'gray' }} />
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar style={{ backgroundColor: 'blue' }}>
        <Appbar.Content
          style={{ justifyContent: 'center', alignItems: 'center', }}
          title={'TODOs List'}
        />
      </Appbar>
      <FlatList
        style={{ flex: 1, backgroundColor: '#f0f8ff', padding: 10, paddingTop: 20, }}
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Todo {...item} />}
        ItemSeparatorComponent={Divider}
      />
      <TextInput label={'New Todo'} value={todo} onChangeText={text => setTodo(text)} />
      <Button icon='plus' onPress={addTodo} textColor='#fff'
        style={{ borderRadius: 0, backgroundColor: 'blue', borderWidth: 0 }}>
        Add TODO
      </Button>
    </View>
  )
}

export default Exercise3;