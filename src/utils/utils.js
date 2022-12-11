import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

export const timeMarks = [
  {
    value: 10,
    label: "<10 min",
  },
  {
    value: 45,
    label: "45 min",
  },
  {
    value: 90,
    label: "90+ min",
  },
];

export const portionMarks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6+",
  },
];

export const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const timeAgo = (date) => {
  const currentTime = Date.now();
  const timeDifference = currentTime - date;
  const minute = 60000;
  const hour = 3600000;
  const day = 86400000;

  // JOS AIKAERO ALLE MINUUTIN
  if (timeDifference < minute) return "Juuri äsken";
  // JOS AIKAERO ALLE TUNNIN
  if (timeDifference < hour)
    return (timeDifference / minute).toFixed(0) + " minuuttia sitten";
  // JOS AIKAERO ALLE VUOROKAUDEN
  if (timeDifference < day)
    return (timeDifference / hour).toFixed(0) + " tuntia sitten";
  // JOS AIKAERO YLI VRK
  if (timeDifference < 30 * day)
    return (timeDifference / day).toFixed(0) + " päivää sitten";
  // YLI KUUKAUSI
  if (timeDifference < 365 * day)
    return (timeDifference / (30 * day)).toFixed(0) + " kuukautta sitten";
  // YLI VUOSI
  if (timeDifference < 729 * day) {
    return "Yli vuosi sitten";
  } else {
    // YLI 2 VUOTTA
    return (timeDifference / (365 * day)).toFixed(0) + " vuotta sitten";
  }
};
