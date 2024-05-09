import { Image, StyleSheet, View, TextInput, Button, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useEffect } from 'react';
import useGeoDataStore from '@/store/useGeoDataStore';
import useUserStore from '@/store/useUserStore';
import { useNavigation } from 'expo-router';
import MapView from 'react-native-maps';

export default function HomeScreen() {
  const navigator = useNavigation()
  const { geo, ip, error, setIp, setError, fetchFromInput, fetchFromUser } = useGeoDataStore((state: any) => state)
  const { token, user } = useUserStore((state: any) => state)
  const checkIpAddress = (ip: string) => { 
    const ipv4Pattern =  
        /^(\d{1,3}\.){3}\d{1,3}$/; 
    const ipv6Pattern =  
        /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/; 
    return ipv4Pattern.test(ip) || ipv6Pattern.test(ip); 
  } 

  const fetchData = () => {

    if ( ! checkIpAddress(ip) ) {
      setError('You have entered an invalid IP address')
      return
    }

    fetchFromInput(ip)
  }

  useEffect(() => {
    // Check if the user is logged in or not
    if ( token === '' ) {
      navigator.navigate('login')
    }
    // Get the current user IP address
    fetchFromUser()
  })

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
		}>
			<View style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <TextInput onChange={(e: any) => setIp(e.target.value)} value={ip} placeholder='Enter IP Address' style={styles.inputText} />
          <Button title="fetch" onPress={fetchData} />
        </View>
        {(error !== '')
          ? <View>
              <Text style={{ color: 'red' }}>{error}</Text>
            </View>
          : <View>
              {geo.map((item: any) => (
                <View style={styles.inputContainer}>
                  <Text style={{ color: '#fff', fontWeight: 800 }}>{item?.key}:</Text>
                  <Text style={{color: '#ccc'}}>{item?.value}</Text>
                </View>
              ))}
            </View>
        }
        {/* <View style={styles.container}>
          <MapView style={styles.map} />
        </View> */}
      </View>
		</ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
		backgroundColor: '#252329',
		gap: 8,
		padding: 20,
		width: '100%',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 15,
	},
  formContainer: {
		marginTop: 60
	},
	inputContainer: {
    gap: 8,
		marginBottom: 30,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
	},
	inputText: {
		width: '100%',
		borderRadius: 10,
		backgroundColor: '#8a8495',
		color: '#fff',
		paddingVertical: 10,
		paddingHorizontal: 20
	},
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
