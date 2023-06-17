import { Box } from "@mui/material";
import { styled } from "@mui/system";

/* It will be another usable style component for our widgets */
/* This will wrap our widgets and give it a base styling */
const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding : "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor : theme.palette.background.alt,
  borderRadius : "0.75rem"
}));

export default WidgetWrapper;