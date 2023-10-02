import { Image } from 'expo-image';
import { useEffect, useCallback, useState, useReducer } from 'react'
import { View, Text, TextInput, Button, Pressable } from 'react-native'
import { WebView } from 'react-native-webview'

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

    const initialState = {
        shouldOpenWebView: false
    }

    const reducer = (state: any, action: any) => {
        switch (action.type) {
            case 'SET_SHOULD_OPEN_WEB_VIEW':
                return {
                    ...state,
                    shouldOpenWebView: action.payload
                }
            default:
                return state
        }
    }

    const [qntPlayers, setQntPlayers] = useState<string>('')
    const [handleError, setHandleEror] = useState<boolean>(false)

    const [agents, setAgents] = useState<AgentsData>()
    const [state, dispatch] = useReducer(reducer, initialState)

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

    const shuffleArray = (array: any[]) => {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    return (
        <View style={{ backgroundColor: 'rgb(9,9,11)', minHeight: '100%', alignItems: 'center' }}>
            <Image style={{ borderRadius: 8, marginTop: 100, width: 100, height: 100 }} source={{ uri: "https://i.redd.it/w2k5s8br47i51.gif" }} />
            <Text style={{ color: '#f64f4f', fontSize: 26, fontWeight: 'bold' }}>Valorant Pick</Text>
            <TextInput
                style={{ color: '#fff', textAlign: 'center', marginTop: 60, marginBottom: 20, backgroundColor: 'rgb(24, 24, 27)', borderRadius: 4, paddingHorizontal: 20, paddingVertical: 10 }}
                keyboardType='number-pad'
                onChangeText={(text) => setQntPlayers(text)}
                value={qntPlayers}
                maxLength={5}
            />
            <Button onPress={handleSubmit} color={"#f64f4f"} title='Confirmar' />

            {handleError && (
                <Text style={{ color: 'red' }}>Por acaso já viu um time de {qntPlayers}?</Text>
            )}
            <Text style={{ color: '#fff', fontSize: 10, marginTop: 150 }}>{new Date().getFullYear()} &copy; Developed By Jorge Lemos</Text>
            <Pressable onPress={() => dispatch({ type: 'SET_SHOULD_OPEN_WEB_VIEW', payload: true })}>
                <Text style={{ color: '#4682BF' }}>Projeto no Github</Text>
            </Pressable>
        </View>
    )
}

export default Home