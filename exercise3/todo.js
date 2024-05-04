import { doc, updateDoc } from 'firebase/firestore'
import { List } from 'react-native-paper'
import { db } from './firebase'

export default function Todo({ id, title, complete }) {
  async function toggleComplete() {
    await updateDoc(doc(db, 'todos', id), { complete: !complete })
  }

  return (
    <List.Item
      titleStyle={{ fontSize: 20, fontStyle: complete ? 'normal' : 'italic' }}
      title={title}
      onPress={() => toggleComplete()}
      left={props => (
        <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
      )}
    />
  );
}