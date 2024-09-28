import { useQuery } from "@tanstack/react-query";
import { getGalleryItems } from "../apis/get";
import { TourApiResponse } from "../types/api";
import { GalleryItems } from "../types/domain";

const useGetGalleryItems = () => {
  const { data, status } = useQuery({
    queryKey: ["galleryItems"],
    queryFn: async (): Promise<TourApiResponse<GalleryItems>> => {
      const res = await getGalleryItems();
      return res;
    },
    select: (data) => data.response.body.items.item,
  });

  return { data, status };
};

export default useGetGalleryItems;
