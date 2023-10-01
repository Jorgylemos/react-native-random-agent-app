import { useEffect, useCallback, useState } from 'react'
import { Image, View, Text, TextInput, Button, StyleSheet } from 'react-native'

interface Agents {
    displayName: string;
    fullPortrait: string;
}

interface AgentsData {
    data: Array<Agents>
}

function Home({ navigation }: any) {

    const [qntPlayers, setQntPlayers] = useState('')
    const [handleError, setHandleEror] = useState('')

    const [agents, setAgents] = useState<AgentsData>()

    const searchAgents = useCallback(async () => {
        const res = await fetch('https://valorant-api.com/v1/agents')
        const data: AgentsData = await res.json().then(data => data)
        setAgents(data)
    }, [])

    useEffect(() => {
        searchAgents()
    }, [])


    if (!agents) {
        return (
            console.log("Not have agents")
        )
    }

    const handleSubmit = () => {
        if (parseInt(qntPlayers) < 1 || parseInt(qntPlayers) > 5) {
            setHandleEror('Digite um valor entre 1 e 5')
            return
        }

        const shuffledAgents = shuffleArray(agents?.data);
        const selectedAgents = shuffledAgents.slice(0, parseInt(qntPlayers));

        navigation.navigate('RandomAgent', { players: qntPlayers, agents: selectedAgents })
    }

    const shuffleArray = (array: any[]) => {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Digite quantos players irão jogar: </Text>
            <Text style={{ fontSize: 10, color: 'red' }}>Obs (Entre 1 e 5)</Text>
            <TextInput
                style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 15 }}
                keyboardType='number-pad'
                onChangeText={(text) => setQntPlayers(text)}
                value={qntPlayers}
                maxLength={5}
            />
            <Button onPress={handleSubmit} title='Confirmar' />

            {handleError && (
                <Text style={{ color: 'red' }}>Digite um valor entre 1 e 5!</Text>
            )}

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff'
    }
})