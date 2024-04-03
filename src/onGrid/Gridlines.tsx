import { FC, useContext } from "react";
import { SUBDIVISIONS_PER_HOUR } from "../utils/models";
import { ThemeContext } from "../utils/themeContext";
import HorizontalLines from "./HorizontalLines";

export interface GridlinesProps {
  numHours: number;
  numDays: number;
  darkMode?: boolean;
}

const Gridlines: FC<GridlinesProps> = (props) => {
  const { numHours, numDays } = props;

  const theme = useContext(ThemeContext);

  const { minorGridlinesPerHour, style } = theme;

  return (
    <>
      {/* Minor Gridlines */}
      {minorGridlinesPerHour > 0 && (
        <HorizontalLines
          darkMode={props.darkMode}
          numLines={numHours * minorGridlinesPerHour + 1}
          offset={1}
          spacing={SUBDIVISIONS_PER_HOUR / minorGridlinesPerHour - 1}
          borderStyle={style?.minorGridlinesBorder}
        />
      )}

      {/* Major Gridlines */}
      <HorizontalLines
        darkMode={props.darkMode}
        numLines={numHours + 1}
        offset={1}
        spacing={SUBDIVISIONS_PER_HOUR - 1}
        borderStyle={style?.majorGridlinesBorder}
      />

      {/* Vertical Lines */}
      {new Array(numDays - 1).fill(0).map((_, i) => {
        return (
          <div
            key={i}
            style={{
              opacity: props.darkMode ? 0.2 : undefined,
              gridColumn: `${i + 2}`,
              gridRow: `2 / span ${numHours * SUBDIVISIONS_PER_HOUR}`,
              borderRight: style?.verticalGridlinesBorder,
            }}
          />
        );
      })}
    </>
  );
};

export default Gridlines;
