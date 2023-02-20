import {React, useState, useEffect, Fragment} from 'react';
import {db} from '../../FirebaseConfig';
import {doc, collection, getDoc, getDocs} from "firebase/firestore";
import QuantSelectee from "../../components/cards/statistics/QuantSelectee";
import {ButtonBase, CardActionArea, Grid, Stack, Typography} from "@mui/material";
import theme from "../../themes/theme";
import {useTheme} from "@mui/material/styles";

import TFLogo from '../../assets/images/tradefusion_avatar.png';

export default function AvailableQuants(props) {
  const [fetchedQuants, setQuants] = useState([]);
  const [isSelected, setIsSelected] = useState();
  const [quantsLoaded, setQuantsLoaded] = useState(false);

  const fetchQuants = async () => {
    const querySnapshot = await getDocs(collection(db, "quant_names"));
    querySnapshot.forEach((doc) => {
      const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setQuants(newData);
      setQuantsLoaded(true);
      console.log("Got it");
    });
  }

  const onClickHandler = (quant, index) => {
    props.onSelectedQuant(quant);
    setIsSelected(index);
  }

  useEffect(() => {
    fetchQuants();
  }, [])


  return (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Available Quants</Typography>
      </Grid>
      {!quantsLoaded &&
        <Grid item container justifyContent={"space-between"} spacing={2}>
          <Grid item xs={12} sm={6} lg={6}>
            <QuantSelectee color='' loaded={false} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <QuantSelectee color='' loaded={false}/>
          </Grid>
        </Grid>
      }
      {quantsLoaded && fetchedQuants.map((quant, index) => (
        <Grid key={index} item xs={12} sm={6} lg={6}>
          <CardActionArea onClick={() => onClickHandler(quant, index)}>
            {isSelected === index &&
              <QuantSelectee title="Total Bots" totalBots={Object.keys(quant.bots).length.toString()} color="primary"
                             icon={TFLogo} quantName={quant.about.display_name} loaded={true}/>}
            {isSelected !== index &&
              <QuantSelectee title="Total Bots" totalBots={Object.keys(quant.bots).length.toString()} color={""}
                             icon={TFLogo} quantName={quant.about.display_name} loaded={true}/>}
          </CardActionArea>
        </Grid>
      ))
      }
    </Grid>
  );
}