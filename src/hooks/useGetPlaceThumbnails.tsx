import { useQueries } from "@tanstack/react-query";
import { getPlaceThumbnail } from "../apis/get";
import { Document, Place } from "../types/domain";

interface PlaceThumbnailResponse {
  documents: Document[];
}

const useGetPlaceThumbnails = (places: Place[]) => {
  const allQueries = useQueries({
    queries: places.map((place) => {
      return {
        queryKey: ["placeThumbnails", place],
        queryFn: () =>
          getPlaceThumbnail({
            params: {
              query: `${place.placeName} ${place.placeType}`,
            },
          }),
        enabled: place.placeName != "",
        select: (data: PlaceThumbnailResponse) => {
          return data.documents[0];
        },
      };
    }),
  });

  const placeThumbnails = allQueries.reduce(
    (acc: Record<string, Document>, query, index) => {
      const placeName = places[index].placeName;
      if (query.data) acc[placeName] = query.data;
      return acc;
    },
    {}
  );

  return { placeThumbnails };
};

export default useGetPlaceThumbnails;
