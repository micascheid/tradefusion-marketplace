import {React, useState, useEffect} from 'react';
import {db} from '../../FirebaseConfig';
import {doc, collection, getDoc, getDocs} from "firebase/firestore";
import QuantSelectee from "../../components/cards/statistics/QuantSelectee";
import {ButtonBase, CardActionArea, Grid, Typography} from "@mui/material";
import theme from "../../themes/theme";
import {useTheme} from "@mui/material/styles";

import TFLogo from '../../assets/images/tradefusion_avatar.png';

export default function AvailableQuants(props) {
  const theme = useTheme();
  const test = ['mica', 'rando'];
  const [fetchedQuants, setQuants] = useState(['mica', 'rando']);
  const [isSelected, setIsSelected] = useState();

  const fetchQuants = async () => {
    await getDocs(collection(db, "quant_names"))
      .then((querySnapshot)=>{
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}));
        setQuants(newData);
      })

  }

  const onClickHandler = (quant, index) => {
    props.onSelectedQuant(quant);
    setIsSelected(index);
  }

  useEffect(()=>{
    fetchQuants();
  }, [])


  return (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Available Qaunts</Typography>
      </Grid>
      {fetchedQuants.map((quant,index) => (
          <Grid key={index} item xs={12} sm={6} lg={4}>
            <CardActionArea onClick={() => onClickHandler(quant, index)}>
              {isSelected === index && <QuantSelectee title="Total Bots" totalBots={"3"} color="info" icon={TFLogo} quantName={quant.id}/>}
              {isSelected !== index && <QuantSelectee title="Total Bots" totalBots={"3"} color="secondary" icon={TFLogo} quantName={quant.id}/>}
            </CardActionArea>
          </Grid>
        ))
      }
    </Grid>
  );
}

