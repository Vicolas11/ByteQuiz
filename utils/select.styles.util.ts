const prmColor = "#FF9400";

export const selectStyles = (
  isMenuOpen: boolean,
  isValue: boolean,
  width?: string,
  fontSize?: string,
  windowWidth?: number
) => {
  return {
    control: (provided: object, state: { isFocused: boolean }) => ({
      ...provided,
      outline:
        state.isFocused && isMenuOpen
          ? `2px solid ${prmColor}`
          : "1px solid #BDBFC1",
      borderRadius: `${isMenuOpen ? "5px 5px 0 0" : "5px"}`,
      boxShadow: "none",
      border: "none",
      "&:hover": {
        outline:
          state.isFocused && isMenuOpen
            ? `2px solid ${prmColor}`
            : `1px solid ${prmColor}`,
      },
    }),
    container: (provided: object) => ({
      ...provided,
      boxShadow: "none",
      border: "none",
      width,
    }),
    singleValue: (provided: object) => ({
      ...provided,
      fontSize:
        windowWidth && windowWidth <= 428
          ? "0.8rem"
          : fontSize
          ? fontSize
          : "1rem",
      lineHeight: "1.25rem",
      color: "#606062",
    }),
    placeholder: (provided: object) => ({
      ...provided,
      color: "#9CA3AF",
      fontSize: "1rem",
      lineHeight: "1.25rem",
    }),
    menu: (provided: object) => ({
      ...provided,
      outline: isMenuOpen ? `2px solid ${prmColor}` : `1px solid #BDBFC1`,
      borderRadius: "none",
      marginTop: "0",
      padding: "0",
    }),
    option: (provided: object, state: { isSelected: boolean }) => ({
      ...provided,
      fontSize:
        windowWidth && windowWidth <= 428
          ? "0.8rem"
          : fontSize
          ? fontSize
          : "1rem",
      lineHeight: "1.25rem",
      backgroundColor: state.isSelected ? prmColor : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        cursor: "pointer",
        backgroundColor: `${state.isSelected ? prmColor : "#F3F5F6"}`,
      },
    }),
    indicatorsContainer: (provided: object) => ({
      ...provided,
      color: "blue",
    }),
    indicatorSeparator: (provided: object) => ({
      ...provided,
      display: isValue ? "block" : "none",
    }),
  };
};
