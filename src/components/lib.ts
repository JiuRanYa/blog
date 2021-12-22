import styled from "@emotion/styled";

export const FlexWrapper = styled.div<{
  between?: boolean
  center?: boolean
  around?: boolean
  start?: boolean
  end?: boolean
  marginBottom?: number
  marginTop?: number
  padding?: string
  column?: string
  itemGap?: number | boolean
  height?: string
  width?: string
}>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  flex-direction: ${props => (props.column ? "column" : "row")};
  height: ${props => (props.height ? props.height : "100%")};
  width: ${props => (props.width ? props.width : "100%")};
  justify-content: ${props => {
  const justifyContentAtr = {
    "flex-start": props.start,
    "flex-end": props.end,
    "center": props.center,
    "space-between": props.between,
    "space-around": props.around
  }

  for (const [k, v] of Object.entries(justifyContentAtr)) {
    if (v) {
      return k
    }
  }

  return undefined
}};
  margin-bottom: ${props => (props.marginBottom + "px")};
  margin-top: ${props => (props.marginTop + "px")};
  padding: ${props => (props.padding ? props.padding : "0 .5rem 0 .5rem")};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${ props => typeof props.itemGap === "number" ? props.itemGap + "px" : props.itemGap ? "20px" : undefined };
  }
`


export const GridBox = styled.div<{
  direction?: string
  height?: string
  width?: string
  rows?: string
}>`
  display: grid;
  height: ${props => (props.height ? props.height : "100vh")};
  width: ${props => (props.width ? props.width : "100vw")};
  grid-template-rows: ${props => (props.rows ? props.rows : "50px 1fr 50px")};
  grid-template-areas: 
    "header"
    "main"
    "footer"
  ;
`

export const GHeader = styled.header`
  grid-area: header;
`

export const GMain = styled.main`
  grid-area: main;
`

export const GFooter = styled.footer<{
  marginBottom?: string
}>`
  grid-area: footer;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : undefined)};
`