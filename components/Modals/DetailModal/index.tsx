import { getACompetition } from "@/data/competition/getCompetition";
import { SearchParams } from "@/interfaces/props.interface";
import styles from "./detailmodal.module.scss";
import Modal from "@/components/Modals/Modal";
import { getUser } from "@/data/user/getUser";
import ContinueBtn from "./continueBtn";
import ActionBtn from "./ActionBtn";
import { Suspense } from "react";
import Image from "next/image";

const CompetitionDetailModal = async ({ searchParams }: SearchParams) => {
  const id = searchParams?.id as string;
  const competition = await getACompetition(id);
  const user = await getUser();

  return (
    <Modal xtraStyle={styles.modal}>
      {competition?.data ? (
        <Suspense fallback={<h2 className={styles.loading}>Loading...</h2>}>
          <div className={styles.container}>
            {competition.data.createdUserId === user?.userId && (
              <ActionBtn id={id} showBtnEdit={competition.data.hasStarted} />
            )}
            <h4>{competition.data.title}</h4>
            <div className={styles.scroll}>
              <div className={styles.imgCover}>
                <Image src={competition.data.imgCover} alt="Image Cover" fill />
              </div>
              <p>{competition.data.subtitle}</p>
            </div>
            <ContinueBtn
              id={id}
              userId={user?.userId}
              hasSubmitted={competition.data.hasSubmitted}
              createdUserId={competition.data.createdUserId}
            />
          </div>
        </Suspense>
      ) : (
        <div className={styles.container}>
          <h2 className={styles.notFound}>Competition Not Found</h2>
        </div>
      )}
    </Modal>
  );
};

export default CompetitionDetailModal;
