/* Advertisment widget that will appear on the rightmost-top side of the page just below the navbar */
import { Typography, useTheme } from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import WidgetWrapper from "../../components/WidgetWrapper"

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color="medium">Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/Advert1.jpeg"
        style={{ borderRadius : "0.75rem", margin : "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Garnier Fructis</Typography>
        <Typography color={medium}>garnier.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and glistening hair with long lasting affects.
      </Typography>
    </WidgetWrapper>
  )
}

export default AdvertWidget