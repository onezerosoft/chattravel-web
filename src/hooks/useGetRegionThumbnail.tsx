import { useQuery } from "@tanstack/react-query";
import { getRegionThumbnail } from "../apis/get";
import { TourApiResponse } from "../types/api";
import { GalleryItems } from "../types/domain";

const useGetRegionThumbnail = () => {
  const { data, status } = useQuery({
    queryKey: ["galleryItems"],
    queryFn: async (): Promise<TourApiResponse<GalleryItems>> => {
      const res = await getRegionThumbnail();
      return res;
    },
    select: (data) => data.response.body.items.item[2].galWebImageUrl,
  });

  return { data, status };
};

export default useGetRegionThumbnail;
