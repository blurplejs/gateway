export default abstract class EventType<T> {
    abstract get payload(): T
}
