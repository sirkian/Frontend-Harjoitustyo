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
