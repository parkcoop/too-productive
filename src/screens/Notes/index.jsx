import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Notes = () => {
    return (
        <SafeAreaView style={{flex: 1,}}>
            <Layout style={{flex: 1}}>
                <Text>Take some notes</Text>
            </Layout>
        </SafeAreaView>
    )
}

export default Notes