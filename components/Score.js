import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { black, white, orange, lightGray } from '../utils/colors'
import { withNavigation } from 'react-navigation'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

//function Score(props){
    class Score extends React.Component{

    componentDidUnMount(){
        clearLocalNotification()
        .then(setLocalNotification)
    }
   // const { correct, incorrect, restart, deck, deckId, navigation } = props
    constructor(props){
        super(props)
    }
      
    render(){
        return(
            <View style={styles.center}>
                <Text style={styles.score}>Correct: {this.props.correct}</Text>
                <Text style={styles.score}>Incorrect: {this.props.incorrect}</Text>
                <Text style={styles.score}>{Math.round((this.props.correct/this.props.deck.questions.length)*100)}%</Text>

                <TouchableOpacity
                style={[styles.btn, {backgroundColor: orange, marginTop: 25}]}
                onPress={this.props.restart}
                >
                    <Text style={styles.btnText}>Restart Quiz</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={[styles.btn, {backgroundColor: black, marginTop: 25}]}
                onPress={() => this.props.navigation.navigate('Deck', {deckId: this.props.deckId, deckName: this.props.deck.title})}
                >
                    <Text style={[styles.btnText, {color: white}]}>Back to Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: black,
        borderWidth: 1,
        padding: 15,
        marginTop: 17,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: orange,
    },
    btnText: {
        color: white,
        fontSize: 16,
    },
    score: {
        color: black,
        fontSize: 25,
        marginBottom: 5
    }
  })

export default withNavigation(Score)