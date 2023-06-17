import { Box } from "@mui/material";
import { styled } from "@mui/system";

/* reuseable component which takes a bunch of CSS commands and uses the collection of commands as a whole whenever this component is used */
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent : "space-between",
  alignItems : "center"
})

export default FlexBetween