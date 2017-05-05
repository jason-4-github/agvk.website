export const TableReSizefunc = ( props) => {
  const columnCount = props.columnCount;
  const sizeModel = props.sizeModel;

  const tableHeight = (window.innerHeight - 200);
  let tableWidth = 0;
  let columnWidths = 0;

  const modelConfig = {
    ModelA: [
      { widthSize: 992, sideMenuWidth: 256 },
    ],
    ModelB: [
      { widthSize: 992, sideMenuWidth: 512 },
      { widthSize: 768, sideMenuWidth: 256 },
    ],
  };
  switch (sizeModel) {
    case 'ModelA':
      if (window.innerWidth >= modelConfig[sizeModel][0].widthSize) {
        tableWidth = ((window.innerWidth - modelConfig[sizeModel][0].sideMenuWidth) * 0.8);
        columnWidths = tableWidth / columnCount;
      } else {
        tableWidth = window.innerWidth * 0.8;
        columnWidths = tableWidth / columnCount;
      }
      break;
    default:
      if (window.innerWidth >= modelConfig[sizeModel][0].widthSize) {
        tableWidth = (window.innerWidth - modelConfig[sizeModel][0].sideMenuWidth) * 0.8;
        columnWidths = tableWidth / columnCount;
      } else if (window.innerWidth >= modelConfig[sizeModel][1].widthSize &&
              window.innerWidth < modelConfig[sizeModel][1].widthSize) {
        tableWidth = (window.innerWidth - modelConfig[sizeModel][1].sideMenuWidth) * 0.8;
        columnWidths = tableWidth / columnCount;
      } else {
        tableWidth = window.innerWidth * 0.8;
        columnWidths = tableWidth / columnCount;
      }
  }

  const tableSizeArrs = [tableHeight, tableWidth, columnWidths];
  return tableSizeArrs;
};
