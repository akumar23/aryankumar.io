import { Box, Text } from '@chakra-ui/react'

const Cursor = ({ x, y, color, name }) => {
  return (
    <Box
      position="absolute"
      left={0}
      top={0}
      pointerEvents="none"
      zIndex={9999}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        transition: 'transform 0.05s linear'
      }}
    >
      {/* 90s-style cursor SVG */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.5))' }}
      >
        <path
          d="M5.65376 12.3673L5.46026 12.4946L5.32902 12.6759L3.05002 15.9904L3.00002 16.0554V16.1354V17.1854V17.3754L3.16002 17.4454L4.43002 17.9904L4.50002 18.0154H4.57002H5.65002H5.73002L5.79002 17.9854L7.86002 17.0254L7.91002 17.0054H7.97002H10.06H10.15L10.22 17.0354L12.16 17.9704L12.22 17.9954H12.29H13.3L13.38 17.9654L15.96 16.9804L16.02 16.9554H16.09H17.09H17.17L17.24 16.9254L19.69 15.9504L19.77 15.9154H19.86H21.86H22L22.1 15.8154L22.99 14.7254L23.05 14.6554V14.5654V13.5154V13.3354L22.89 13.2654L20.89 12.5154L20.83 12.4954H20.76H18.76H18.66L18.59 12.5254L16.09 13.5004L16.03 13.5254H15.96H14.96H14.88L14.81 13.4954L12.81 12.5154L12.75 12.4854H12.68H11.68H11.61L11.55 12.5054L9.55002 13.2554L9.48002 13.2854H9.40002H8.40002H8.31002L8.24002 13.2554L6.24002 12.3554L6.17002 12.3254H6.09002H5.09002H5L4.94002 12.3454L3.94002 12.7154L3.87002 12.7454H3.79002H2.79002H2.68002L2.60002 12.6954L1.60002 12.0354L1.52002 11.9854H1.42002H0.42002H0.21002L0.11002 12.1454L0.01002 12.6654V12.7554L0.09002 12.8254L2.09002 14.1654L2.14002 14.2054H2.21002H3.21002H3.30002L3.36002 14.1754L4.36002 13.7254L4.43002 13.6954H4.51002H5.51002H5.60002L5.66002 13.7254L5.65376 12.3673Z"
          fill={color}
          stroke="white"
          strokeWidth="1"
        />
      </svg>
      {/* Name label with 90s styling */}
      <Text
        position="absolute"
        left="24px"
        top="0px"
        fontSize="xs"
        fontWeight="bold"
        color="white"
        bg={color}
        px={2}
        py={0.5}
        borderRadius="0px"
        border="2px solid white"
        boxShadow="2px 2px 0px rgba(0, 0, 0, 0.8)"
        whiteSpace="nowrap"
        textTransform="uppercase"
        letterSpacing="0.5px"
        fontFamily="'Courier New', Courier, monospace"
      >
        {name}
      </Text>
    </Box>
  )
}

export default Cursor
