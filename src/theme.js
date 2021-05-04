import { createMuiTheme } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: {
      ...red
    },
    secondary: {
      ...grey
    },
  }
})

export default theme;