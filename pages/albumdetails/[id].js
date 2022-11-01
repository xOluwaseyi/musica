import React, { useEffect, useState } from "react";
import TopChartsAlbum from "../../components/TopCharts/TopChartsAlbum";

export const getStaticPaths = async () => {
  const res = await fetch("https://musica-api.up.railway.app/playlist");
  const data = await res.json();

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
  const res = await fetch("https://musica-api.up.railway.app/playlist");
  const data = await res.json();

  return {
    props: { playlistData: data, id },
  };
};

const DetailsPage = ({ playlistData, id }) => {
  const [chartData, setChartData] = useState({});
  const [chartDataArray, setChartDataArray] = useState([])
  const [arrayLength, setArrayLength] = useState(null);
  

  useEffect(() => {
    if (playlistData !== null) {
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
