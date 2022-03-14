import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSessions, reset } from "../features/sessions/sessionSlice";
import Spinner from "./Spinner";

function Session() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { sessions, isLoading, isError, message } = useSelector(
    (state) => state.sessions
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getSessions());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  console.log(sessions);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="about-section padding-tb padding-b">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="about-image">
                <img
                  src={require("../assets/images/about/01.jpg")}
                  alt="about image"
                />
                <a
                  href="https://www.youtube.com/embed/SP3yyrboTno"
                  className="play-btn"
                  data-rel="lightcase"
                >
                  <i className="icofont-ui-play"></i>
                  <span className="pluse_2"></span>
                </a>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="section-header text-center">
                <h2>Big Digital Meetup</h2>
                <p>About The Digital Meetup Conference 2021</p>
              </div>
              <div className="section-wrapper text-center">
                <p>
                  Phosrescently ntiate principle centered networks via magnetic
                  services a Entusiasticaly streamline fulys tested metricels
                  apildiously evisculate standards compliant fullys tested
                  metrics without futureproof web services anfullys tested
                  metrice without creative desi futureproof web services without
                  freproof we that and a services enabled apidiously evisculate
                  are standards compliant web services are afor error free
                </p>
                <div className="about-btn-grp">
                  <a href="registration.html" className="lab-btn ">
                    <span>Register Now</span>{" "}
                  </a>
                  <a href="pricing-plan.html" className="lab-btn">
                    <span>Purchase Ticket</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="schedule-section padding-tb padding-b bg-image">
        <div className="container">
          <div className="section-header">
            <h2>Event Schedule</h2>
            <p>A Representation of the event planning</p>
          </div>
          <section className="content">
            {sessions.length > 0 ? (
              <div className="container">
                {sessions.map((session) => (
                  <div className="section-wrapper shape-b" key={session._id}>
                    <div className="row gx-4 gy-5">
                      <div className="col-lg-6">
                        <div className="schedule-left schedule-pack">
                          <h5> {session.name} </h5>

                          <div className="schedule-list" id="accordionExample">
                            <div className="accordion-item">
                              <div className="accordion-header" id="headingOne">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseOne"
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                >
                                  <span className="accor-header-inner d-flex flex-wrap align-items-center">
                                    <span className="accor-thumb">
                                      <img
                                        src={require("../assets/images/event/member/01.png")}
                                        alt="speaker"
                                      />
                                      <span className="child-thumb">
                                        <img
                                          src={require("../assets/images/event/member/02.png")}
                                          alt="speaker"
                                        />
                                      </span>
                                      <span className="child-thumb-2">
                                        <img
                                          src={require("../assets/images/event/member/03.png")}
                                          alt="speaker"
                                        />
                                      </span>
                                    </span>
                                    <span className="h7">
                                      Registration & Breakfast
                                    </span>
                                  </span>
                                </button>
                              </div>
                              <div
                                id="collapseOne"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  <p>{session.details}</p>
                                  <ul className="ev-schedule-meta d-flex flex-wrap">
                                    <li>
                                      <span>
                                        <i className="icofont-user"></i>
                                      </span>
                                      {session.category[0].name}
                                    </li>
                                    <li>
                                      <span>
                                        <i className="icofont-clock-time"></i>
                                      </span>
                                      {session.start} to {session.end}
                                    </li>
                                    <li>
                                      <span>
                                        <i className="icofont-location-pin"></i>
                                      </span>
                                      Summer C
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h3>You have not set any goals</h3>
            )}
          </section>

          <div className="schedule-btns text-center mt-5">
            <a href="#" className="lab-btn">
              Download Schedule
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Session;