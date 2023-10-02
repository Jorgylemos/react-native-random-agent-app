import { View, Text } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const generateAgents = ({ agents }: any) => {
    const agentViews = [];
    for (let i = 0; i < agents.length; i += 2) {
        const agent1 = agents[i];
        const agent2 = agents[i + 1];

        const row = (
            <View key={i / 2} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                {agent1 && (
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Image style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#f64f4f' }} placeholder={blurhash} source={{ uri: agent1.fullPortrait }} />
                        <Text style={{ fontSize: 18, color: '#fff', marginTop: 10, fontWeight: 'bold' }}>{agent1.displayName}</Text>
                        <Text style={{ fontSize: 14, color: '#fff' }}>Role: {agent1.role?.displayName}</Text>
                    </View>
                )}
                {agent2 && (
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Image style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#f64f4f' }} placeholder={blurhash} source={{ uri: agent2.fullPortrait }} />
                        <Text style={{ fontSize: 18, color: '#fff', marginTop: 10, fontWeight: 'bold' }}>{agent2.displayName}</Text>
                        <Text style={{ fontSize: 14, color: '#fff' }}>Role: {agent2.role?.displayName}</Text>
                    </View>
                )}
            </View>
        );

        agentViews.push(row);
    }

    return agentViews;
};

function RandomAgentScreen({ route }: any) {
    const { agents } = route.params;

    return (
        <View style={{ backgroundColor: 'rgb(9,9,11)', minHeight: '100%', padding: 20 }}>
            {generateAgents({ agents })}
        </View>
    );
}

export default RandomAgentScreen;
