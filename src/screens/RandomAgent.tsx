import { View, StyleSheet, ScrollView, Text, Button } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'


const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const generateAgents = ({ agents }: any) => {
    return agents.map((agent: any, index: number) => (
        <ScrollView key={index} contentContainerStyle={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10 }}>
            <Image style={{ width: 100, height: 100, borderRadius: 100, backgroundColor: 'white' }} placeholder={blurhash} source={{ uri: agent.fullPortrait }} />
            <Text style={{ fontSize: 20 }}>{agent.displayName}</Text>
        </ScrollView>
    ));
};

function RandomAgentScreen({ route, navigation }: any) {

    const { agents } = route.params


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Button onPress={() => navigation.goBack('Home')} title='Voltar' />
            {generateAgents({ agents })}
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default RandomAgentScreen