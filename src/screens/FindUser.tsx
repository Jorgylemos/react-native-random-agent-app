import { View, Text, Button, Image, StyleSheet } from 'react-native'

function FindUserScreen({ route, navigation }: any) {

    const { data } = route.params

    return (
        <View style={styles.container}>
            {data && (
                <>
                    <Image style={{ width: 100, height: 100, marginTop: 30 }} source={{ uri: data.avatar_url }} />
                    <Text>User: {data.login}</Text>
                    <Text style={{ textAlign: 'center', marginTop: 15 }}>Biography: {data.bio}</Text>
                </>
            )}
            <Button title='Voltar para inicio' onPress={() => navigation.goBack('Home')} />
        </View>
    )
}

export default FindUserScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})