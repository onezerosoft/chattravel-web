import { useQueries } from "@tanstack/react-query";
import { getPlaceThumbnail } from "../apis/get";
import { Document } from "../types/domain";

interface PlaceThumbnailResponse {
  documents: Document[];
}

const useGetPlaceThumbnails = (placeNames: string[]) => {
  const allQueries = useQueries({
    queries: placeNames.map((placeName) => {
      return {
        queryKey: ["placeThumbnails", placeName],
        queryFn: () =>
          getPlaceThumbnail({
            params: {
              query: placeName,
            },
          }),
        enabled: placeName != "",
        select: (data: PlaceThumbnailResponse) => {
          return data.documents[0];
        },
      };
    }),
  });

  const placeThumbnails = allQueries.reduce(
    (acc: Record<string, Document>, query, index) => {
      const placeName = placeNames[index];
      if (query.data) acc[placeName] = query.data;
      return acc;
    },
    {}
  );

  return { placeThumbnails };
};

export default useGetPlaceThumbnails;
