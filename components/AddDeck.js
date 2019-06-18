import React from 'react'
import { Text, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native'
import { addDeck } from '../actions'
import { saveDeck } from '../utils/api'
import { connect } from 'react-redux'
import { white, black, orange } from '../utils/colors'
import { generateUID } from '../utils/helpers'

// similar to the fitness app's AddEntry component
SubmitDeckBtn = ({ onPress }) => {
    return (
        <TouchableOpacity
         style={styles.submitBtn}
         onPress={onPress}>
            <Text style={styles.submitBtnText}>Create Deck</Text>
        </TouchableOpacity>
    )
}

class AddDeck extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nameOfDeck: ''
        }
    }

    submit = () => {
        const { nameOfDeck } = this.state
        if(nameOfDeck === ''){
            alert('Give this deck a name senpai!')
            return
        }
        const deckId = generateUID()
        const title = nameOfDeck
        const newDeck = {
            title: nameOfDeck.trim(), //remove whitespace
            questions: [] // creating an empty deck
        }
        this.props.dispatch(addDeck(deckId, newDeck))
        this.setState({nameOfDeck: ''})
        this.toDeck(deckId, title) // navigate to newly created deck
        saveDeck(deckId, newDeck) //save deck in asyncstorage
    }

    toDeck = (id, title) => {
        this.props.navigation.navigate('Deck', {deckId: id, deckName: title})
    }

    render(){
        const { nameOfDeck } = this.state

        return(
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.question}>Name your new deck!</Text>
                <TextInput
                 value={nameOfDeck}
                 style={styles.input}
                 onChangeText={(nameOfDeck) => this.setState({nameOfDeck})}
                />
                <SubmitDeckBtn onPress={this.submit} />
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    question: {
        fontSize: 30,
        marginLeft: 20,
        marginRight: 20,
        color: black,
        backgroundColor: white,
    },
    input: {
        width: 250,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: black,
        borderRadius:15,
        margin: 20
    },
    submitBtn: {
        backgroundColor: orange,
        padding: 10,
        borderRadius: 15,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 60,
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    }
})

export default connect()(AddDeck)