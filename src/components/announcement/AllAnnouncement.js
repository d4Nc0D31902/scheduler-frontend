import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allAnnouncements,
  deleteAnnouncement,
} from "../../actions/announcementActions";
import AnnouncementCard from "./AnnouncementCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../layout/Loader";
import "../../App.css";

const AllAnnouncement = () => {
  const dispatch = useDispatch();
  const { announcements, totalAmount, loading } = useSelector(
    (state) => state.allAnnouncements
  );

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(allAnnouncements(page));

    // Cleanup function to reset hasMore when component unmounts
    return () => setHasMore(true);
  }, [dispatch, page]);

  const fetchMoreData = () => {
    // Fetch more data when scrolling down
    if (announcements.length >= totalAmount) {
      setHasMore(false);
      return;
    }

    setPage(page + 1);
  };

  const deleteAnnouncementHandler = (id) => {
    dispatch(deleteAnnouncement(id));
  };

  return (
    <InfiniteScroll
      dataLength={announcements.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Loader />} // Using Loader component as the loader
    >
      {announcements
        .slice()
        .reverse()
        .map((announcement) => (
          <div key={announcement._id}>
            <AnnouncementCard
              announcement={announcement}
              onDelete={deleteAnnouncementHandler}
            />
            <hr />
          </div>
        ))}
    </InfiniteScroll>
  );
};

export default AllAnnouncement;
