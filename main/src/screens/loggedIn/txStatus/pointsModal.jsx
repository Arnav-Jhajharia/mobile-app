const PointsModal = ({ userId, onClose }) => {
    const [points, setPoints] = useState(0);
  
    useEffect(() => {
      const getPoints = async () => {
        const newPoints = await addPoints(userId, 0);
        setPoints(newPoints);
      };
  
      getPoints();
    }, [userId]);
  
    return (
      <Modal visible={true} animationType="fade">
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Your Points</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Text style={styles.pointsText}>You have {points} points!</Text>
            <Image source={require('./assets/coins.png')} style={styles.image} />
          </View>
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      margin: 50,
      padding: 20,
      alignItems: 'center',
      elevation: 5
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    body: {
      alignItems: 'center'
    },
    pointsText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center'
    },
    image: {
      width: 80,
      height: 80,
      resizeMode: 'contain'
    }
  });
  