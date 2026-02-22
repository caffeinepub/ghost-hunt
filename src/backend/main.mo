import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";

actor {
  type Score = Nat;

  module Score {
    public func compare(score1 : Score, score2 : Score) : Order.Order {
      Nat.compare(score1, score2);
    };
  };

  let scoreMap = Map.empty<Principal, Score>();

  public shared ({ caller }) func addScore(points : Nat) : async () {
    let currentScore = switch (scoreMap.get(caller)) {
      case (null) { 0 };
      case (?score) { score };
    };
    let newScore = currentScore + points;
    scoreMap.add(caller, newScore);
  };

  public query ({ caller }) func getScore() : async Score {
    switch (scoreMap.get(caller)) {
      case (null) { 0 };
      case (?score) { score };
    };
  };

  type PrincipalScore = (Principal, Score);

  module PrincipalScore {
    public func compare(tuple1 : PrincipalScore, tuple2 : PrincipalScore) : Order.Order {
      Score.compare(tuple1.1, tuple2.1);
    };
  };

  public query ({ caller }) func getTopScores(limit : Nat) : async [(Principal, Score)] {
    let sorted = scoreMap.entries().toArray().sort();
    let length = if (sorted.size() < limit) { sorted.size() } else { limit };
    sorted.sliceToArray(0, length);
  };

  public shared ({ caller }) func resetScore() : async () {
    if (not scoreMap.containsKey(caller)) {
      Runtime.trap("Caller is not registered.");
    };
    scoreMap.add(caller, 0);
  };
};
