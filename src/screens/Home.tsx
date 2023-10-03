import { Image } from 'expo-image';
import { useEffect, useCallback, useState } from 'react'
import { ScrollView, Text, TextInput, Button, Pressable, RefreshControl } from 'react-native'
import { WebView } from 'react-native-webview'

import { OpenBrowser } from '../utils/OpenBrowser';
import { shuffleArray } from '../utils/ShuffleArray'


interface RoleProps {
    displayName: string;
}

interface Agents {
    role: RoleProps;
    displayName: string;
    fullPortrait: string;
}

interface AgentsData {
    data: Array<Agents>
}

function Home({ navigation }: any) {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const { state, dispatch } = OpenBrowser();

    const [qntPlayers, setQntPlayers] = useState<string>('')
    const [handleError, setHandleEror] = useState<boolean>(false)

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

    if (state.shouldOpenWebView) {
        return (
            <WebView
                source={{ uri: 'https://github.com/Jorgylemos/react-native-random-agent-app' }}
            />
        )
    }

    const handleSubmit = () => {
        if (parseInt(qntPlayers) < 1 || parseInt(qntPlayers) > 5) {
            setHandleEror(true)
            return
        }

        setHandleEror(false)
        const shuffledAgents = shuffleArray(agents?.data);
        const selectedAgents = shuffledAgents.slice(0, parseInt(qntPlayers));

        navigation.navigate('RandomAgent', { players: qntPlayers, agents: selectedAgents })
    }


    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={{ backgroundColor: 'rgb(9,9,11)', minHeight: '100%', alignItems: 'center' }}>
            <Image style={{ borderRadius: 8, marginTop: 100, width: 100, height: 100 }} source={require('../../assets/logo.gif')} />
            <Text style={{ color: '#f64f4f', fontSize: 26, fontWeight: 'bold' }}>Valorant Pick</Text>
            <TextInput
                style={{ color: '#fff', textAlign: 'center', marginTop: 60, marginBottom: 20, backgroundColor: 'rgb(24, 24, 27)', borderRadius: 4, paddingHorizontal: 20, paddingVertical: 10 }}
                keyboardType='number-pad'
                onChangeText={(text) => setQntPlayers(text)}
                value={qntPlayers}
                maxLength={5}
            />
            <Button onPress={handleSubmit} color={"#f64f4f"} title='Confirmar' />

            <Button color={"#333"} title='Agente por mapa (Disabled)' />

            {handleError && (
                <Text style={{ color: 'red' }}>Por acaso já viu um time de {qntPlayers}?</Text>
            )}
            <Text style={{ color: '#fff', fontSize: 10, marginTop: 150 }}>{new Date().getFullYear()} &copy; Developed By Jorge Lemos</Text>
            <Pressable onPress={() => navigation.navigate('Policy')}>
                <Text style={{ fontSize: 10, color: '#4682BF' }}>Policy</Text>
            </Pressable>
            <Pressable onPress={() => dispatch({ type: 'SET_SHOULD_OPEN_WEB_VIEW', payload: true })}>
                <Text style={{ color: '#4682BF' }}>Projeto no Github</Text>
            </Pressable>
        </ScrollView>
    )
}

export default Home