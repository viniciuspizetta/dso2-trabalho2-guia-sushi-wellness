import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native'

import MapView from 'react-native-maps'

export default class MapaTeste extends Component {
    state = {
        places: [
            {
                id: 1,
                title: 'Jun',
                description: 'jun descricao',
                latitude: -27.534914,
                longitude: -48.508940,
            },
            {
                id: 2,
                title: 'Temakin',
                description: 'temakin descricao',
                latitude: -27.539101,
                longitude: -48.506186,
            },
            {
                id: 3,
                title: 'Nipo',
                description: 'nipo descricao',
                latitude: -27.544459,
                longitude: -48.500464,
            },
            {
                id: 4,
                title: 'Kikoni',
                description: 'kikoni descricao',
                latitude: -27.585876,
                longitude: -48.546583,

            },
            {
                id: 5,
                title: 'Tosh',
                description: 'tosh descricao',
                latitude: -27.643781,
                longitude: -48.664811,
            },
        ]
    }

    _mapReady = () => {
        this.state.places[0].mark.showCallout()
    }

    render() {
        const { latitude, longitude } = this.state.places[0]

        return (
            <View style={styles.container}>
                <MapView
                    ref={map => this.mapView = map}
                    initialRegion={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.0142,
                        longitudeDelta: 0.0231,
                    }}
                    style={styles.mapView}
                    rotateEnabled={false}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    showsPointsOfInterest={false}
                    showBuildings={false}
                    onMapReady={this._mapReady}
                >
                    {this.state.places.map(place => (
                        <MapView.Marker
                            ref={mark => place.mark = mark}
                            title={place.title}
                            description={place.description}
                            key={place.id}
                            coordinate={{
                                latitude: place.latitude,
                                longitude: place.longitude,
                            }}
                        />
                    ))}
                </MapView>
                <ScrollView
                    style={styles.placesContainer}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e) => {
                        const place = (e.nativeEvent.contentOffset.x > 0)
                            ? e.nativeEvent.contentOffset.x / Dimensions.get('window').width
                            : 0

                        const { latitude, longitude, mark } = this.state.places[place]

                        this.mapView.animateToCoordinate({
                            latitude,
                            longitude
                        }, 500)

                        setTimeout(() => {
                            mark.showCallout()
                        }, 500)
                    }}
                >
                    {this.state.places.map(place => (
                        <View key={place.id} style={styles.place}>
                            <Text style={styles.title}>{place.title}</Text>
                            <Text style={styles.description}>{place.description}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        )
    }
}

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },

    mapView: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    placesContainer: {
        width: '100%',
        maxHeight: 200,
    },

    place: {
        width: width - 40,
        maxHeight: 200,
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: 'transparent',
    },

    description: {
        color: '#999',
        fontSize: 12,
        marginTop: 5,
    },
})