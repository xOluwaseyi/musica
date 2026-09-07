import React, { useEffect, useState } from "react";
import TopChartsAlbum from "../../components/TopCharts/TopChartsAlbum";
import { getPlaylists } from "../../lib/gospelData";

// to fetch data and create dynamic pages
export const getStaticPaths = async () => {
  const data = await getPlaylists();

  const paths = data.map((playlist) => {
    return {
      params: { id: playlist.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await getPlaylists();

  return {
    props: { playlistData: data, id },
  };
};

// component to be diaplyed
const DetailsPage = ({ playlistData, id }) => {
  // state
  const [chartData, setChartData] = useState({});
  const [chartDataArray, setChartDataArray] = useState([])
  const [arrayLength, setArrayLength] = useState(null);
  
  // to init data to be displayed
  useEffect(() => {
    if (playlistData !== null) {
      // to get playlist id
      const playlistIdArray = id.split("-");
      const playlistId = playlistIdArray[1] - 1;

      setChartDataArray(playlistData[playlistId].files);
      setArrayLength(playlistData.length);
      setChartData(playlistData[playlistId]);
    }
  }, [playlistData, id]);

  return (
    <div>
      <TopChartsAlbum
        playlistData={chartData}
        playlistArrayLength={arrayLength}
        playlistArray={chartDataArray}
      />
    </div>
  );
};

export default DetailsPage;
